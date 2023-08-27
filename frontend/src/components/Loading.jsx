import '../styles/Loading.css'

const Loading = ({loading}) => {
  return (
    <div className={`${!loading && 'hidden'} loading-container`}>
        <h2>Uploading...</h2>
        <div className='loading'></div>
    </div>
  )
}

export default Loading