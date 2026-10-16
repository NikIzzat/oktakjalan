import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigError = Boolean(url) !== Boolean(anonKey)
  ? 'Set both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable cloud sync.'
  : ''

export const supabase = url && anonKey ? createClient(url, anonKey) : null

function mapReport(row) {
  return {
    id: row.id,
    routeId: row.route_id,
    routeName: row.route_name,
    segmentId: row.segment_id,
    segmentName: row.segment_name,
    rating: row.rating,
    reason: row.reason,
    photoName: row.photo_name || '',
    photoData: row.photo_data || '',
    createdAt: row.created_at,
    location: row.location,
  }
}

export async function fetchStatuses() {
  const { data, error } = await supabase.from('route_segment_statuses').select('segment_id,status,reason,updated_at')
  if (error) throw error
  return data
}

export async function saveStatus(segmentId, status, reason = '') {
  const { error } = await supabase.from('route_segment_statuses').upsert({
    segment_id: segmentId,
    status,
    reason,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function fetchReports() {
  const { data, error } = await supabase
    .from('route_reports')
    .select('id,route_id,route_name,segment_id,segment_name,rating,reason,photo_name,photo_data,created_at,location')
    .order('created_at', { ascending: false })
    .limit(30)
  if (error) throw error
  return data.map(mapReport)
}

export async function saveReport(report) {
  const { error } = await supabase.from('route_reports').insert({
    id: report.id,
    route_id: report.routeId,
    route_name: report.routeName,
    segment_id: report.segmentId,
    segment_name: report.segmentName,
    rating: report.rating,
    reason: report.reason,
    photo_name: report.photoName,
    photo_data: report.photoData,
    created_at: report.createdAt,
    location: report.location,
  })
  if (error) throw error
}

export function subscribeToOkTakRoute(onStatusChange, onReport, onConnectionChange) {
  return supabase
    .channel('oktakroute-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'route_segment_statuses' }, (payload) => {
      onStatusChange(payload)
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'route_reports' }, (payload) => {
      onReport(mapReport(payload.new))
    })
    .subscribe((status, error) => {
      onConnectionChange(status, error)
    })
}
