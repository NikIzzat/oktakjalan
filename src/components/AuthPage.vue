<script setup>
import { ref, computed } from 'vue'

const mode = ref('login')
const form = ref({ name: '', identity: '', email: '', password: '' })
const isLogin = computed(() => mode.value === 'login')

function submit() {
  console.log(mode.value, { ...form.value })
}

const social = [
  {
    name: 'Google',
    path: 'M12 5a7 7 0 1 0 6.9 8H12v-3h10a10 10 0 1 1-3-7.2l-2.3 2.3A7 7 0 0 0 12 5z',
  },
  {
    name: 'Facebook',
    path: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z',
  },
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900">
    <main class="grid min-h-[100svh] md:grid-cols-2">
      <section
        class="relative hidden items-center justify-center overflow-hidden bg-[#3d2c4d] md:flex"
        aria-label="Accessibility illustration"
      >
        <div class="flex flex-col items-center">
          <svg
            viewBox="0 0 320 340"
            class="oku-float h-auto w-[min(34vw,380px)] overflow-visible"
            role="img"
            aria-label="OKU accessibility symbol: a wheelchair user inside a blue badge"
          >
            <defs>
              <radialGradient id="badge" cx="35%" cy="25%" r="85%">
                <stop offset="0" stop-color="#3B82F6" />
                <stop offset="1" stop-color="#0A2F73" />
              </radialGradient>
            </defs>
            <circle cx="160" cy="150" r="128" fill="none" stroke="#22d3ee" stroke-width="4" opacity=".85" />
            <circle cx="160" cy="150" r="120" fill="url(#badge)" />
            <g
              fill="none"
              stroke="#fff"
              stroke-width="13"
              stroke-linecap="round"
              stroke-linejoin="round"
              transform="translate(10 -10)"
            >
              <circle cx="150" cy="78" r="13" fill="#fff" stroke="none" />
              <path d="M150 106V165H198L222 215H240" />
              <path d="M150 130H192" />
              <path d="M110 159A52 52 0 1 0 183 232" />
            </g>
            <text
              x="160"
              y="312"
              text-anchor="middle"
              fill="#fff"
              font-size="40"
              font-weight="700"
              letter-spacing="14"
            >OKU</text>
          </svg>
          <div class="oku-shadow mt-6 h-3 w-56 rounded-[50%] bg-black/70 blur-[2px]"></div>
        </div>
      </section>

      <section class="flex items-center justify-center px-6 py-16">
        <div class="w-full max-w-[340px]">
          <h1 class="brand-lockup mb-14 select-none">oktakjalan</h1>

          <p class="mb-3 text-[13px] text-neutral-500">Express login via Google and Facebook</p>
          <div class="flex gap-0.5">
            <button
              v-for="s in social"
              :key="s.name"
              type="button"
              class="flex h-[50px] flex-1 items-center justify-between bg-[#f0f0f0] px-5 text-[15px] text-neutral-500 transition first:rounded-l-lg last:rounded-r-lg hover:bg-[#e6e6e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {{ s.name }}
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <path :d="s.path" />
              </svg>
            </button>
          </div>

          <hr class="my-5 border-t-[3px] border-[#f0f0f0]" />

          <div role="tablist" aria-label="Authentication mode" class="flex">
            <button
              v-for="t in [{ id: 'login', label: 'Log in' }, { id: 'signup', label: 'Sign up' }]"
              :key="t.id"
              role="tab"
              type="button"
              :aria-selected="mode === t.id"
              class="rounded-t-lg px-5 py-3.5 text-[15px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              :class="mode === t.id ? 'bg-[#f0f0f0] font-medium text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'"
              @click="mode = t.id"
            >
              {{ t.label }}
            </button>
          </div>

          <form class="space-y-0.5" role="tabpanel" @submit.prevent="submit">
            <label v-if="!isLogin" class="block">
              <span class="sr-only">Name</span>
              <input
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="full name"
                class="h-[50px] w-full bg-[#f0f0f0] px-5 text-[15px] placeholder-neutral-500 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </label>
            <label class="block">
              <span class="sr-only">{{ isLogin ? 'Email or username' : 'Email' }}</span>
              <input
                v-if="isLogin"
                v-model="form.identity"
                type="text"
                autocomplete="username"
                placeholder="email or username"
                required
                class="h-[50px] w-full bg-[#f0f0f0] px-5 text-[15px] placeholder-neutral-500 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
              <input
                v-else
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="email"
                required
                class="h-[50px] w-full bg-[#f0f0f0] px-5 text-[15px] placeholder-neutral-500 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </label>
            <label class="block">
              <span class="sr-only">Password</span>
              <input
                v-model="form.password"
                type="password"
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
                placeholder="password"
                required
                class="h-[50px] w-full bg-[#f0f0f0] px-5 text-[15px] placeholder-neutral-500 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </label>
            <button
              type="submit"
              class="h-[50px] w-full rounded-b-lg bg-[#323232] text-[15px] font-medium text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {{ isLogin ? 'Log in' : 'Create account' }}
            </button>
          </form>

          <p v-if="isLogin" class="mt-5 text-center text-sm">
            <a href="#" class="hover:underline">Forgot password?</a>
          </p>

          <hr class="my-5 border-t-[3px] border-[#f0f0f0]" />

          <a
            href="#"
            class="flex items-center gap-3 rounded-lg border-2 border-amber-300 bg-amber-50 px-3.5 py-3 text-[15px] transition hover:bg-amber-100"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M12 3 2 20h20L12 3z" stroke-linejoin="round" />
              <path d="M12 10v5M12 17.5v.5" stroke-linecap="round" />
            </svg>
            Looking for the old portal?
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@keyframes oku-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

@keyframes oku-shadow {
  0%,
  100% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleX(0.82);
    opacity: 0.45;
  }
}

.oku-float {
  animation: oku-float 4s ease-in-out infinite;
}

.oku-shadow {
  animation: oku-shadow 4s ease-in-out infinite;
}

.brand-lockup {
  font-size: 2.1rem;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: lowercase;
  background: linear-gradient(135deg, #111827 0%, #6d28d9 35%, #0ea5e9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  .oku-float,
  .oku-shadow {
    animation: none;
  }
}
</style>
