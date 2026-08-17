<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
    >
      <NuxtLink
        to="/products"
        class="rounded-lg text-xl font-bold tracking-normal text-slate-950 transition logo"
      >
        Catalog
      </NuxtLink>

      <div class="flex items-center gap-4">
        <button
          type="button"
          aria-label="Toggle theme"
          class="grid size-10 place-items-center rounded-full text-slate-950 transition hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Favorites"
          class="relative grid size-10 place-items-center rounded-full bg-white text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.08) hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
          <span
            class="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-violet-600 text-[10px] font-bold leading-none text-white shadow-lg shadow-violet-600/25"
            >3</span
          >
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.logo {
  font-family: cursive;
}
</style>
