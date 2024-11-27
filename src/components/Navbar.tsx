interface NavbarProps {
  title: string
}

const Navbar: React.FC<NavbarProps> = props => {
  return (
    <div>
      {props.title}
      <input type="text" />
    </div>
  )
}

export default Navbar
