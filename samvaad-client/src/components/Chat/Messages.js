const Messages = (props) => {
    return (
        <div className={`${props.isMyMessage?'align-self-end':''} bg-primary text-light p-1 rounded my-2 w-75`}>
            {props.isMyMessage?'You':props?.sender}
        <div className="bg-light text-primary rounded ">{props?.content}</div>

    </div>
    )
}
export default Messages
