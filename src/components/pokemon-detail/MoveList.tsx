type Props = {
  moves: Pokemon.Move[]
}

const MoveList: React.FC<Props> = ({ moves }) => {
  // Show at most 30 moves
  const displayed = moves.slice(0, 30)

  return (
    <div className="moves-grid">
      {displayed.map((move, index) => (
        <span key={index} className="move-chip">
          {move.move.name.replace(/-/g, ' ')}
        </span>
      ))}
      {moves.length > 30 && (
        <span className="move-chip move-chip-more">
          +{moves.length - 30} more
        </span>
      )}
    </div>
  )
}

export default MoveList
