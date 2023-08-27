import '../styles/Alert.css'

const Alert = ({ alert }) => {
    return (
        <div className={`alert`}>
            {alert.msg}
        </div>
    )
}

export default Alert