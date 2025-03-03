const Sidebar = () => {
  return (
    <div className="fixed left-[max(0px,calc(50%-45rem))] top-0 hidden h-full w-[19rem] bg-slate-900 px-8 text-white lg:block">
      <ul className="border-l border-slate-800">
        <li>
          <a
            href="/"
            className="block border-l border-transparent pl-4 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          >
            Pokédex
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block border-l border-transparent pl-4 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          >
            Home
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
