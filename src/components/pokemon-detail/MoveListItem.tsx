const MoveListItem = ({ move }: Pokemon.Move) => {
  return <div>{JSON.stringify(move.name)}</div>
}

export default MoveListItem
