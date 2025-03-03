import MoveListItem from '@/components/pokemon-detail/MoveListItem'

type Props = {
  moves: Pokemon.Move[]
}

const MoveList: React.FC<Props> = ({ moves }) => {
  return (
    <>
      <div>
        {moves.map((move, index) => {
          return <MoveListItem {...move} key={index} />
        })}
      </div>
    </>
  )
}

export default MoveList
