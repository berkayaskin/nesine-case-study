import { ThemeToggle } from '@/components/theme-toggle'

const Header = () => {
  return (
    <header className="bg-base-100/80 sticky top-0 z-10 w-full backdrop-blur-md">
      <section className="flex items-center justify-end p-5">
        <ThemeToggle />
      </section>
    </header>
  )
}

export default Header
