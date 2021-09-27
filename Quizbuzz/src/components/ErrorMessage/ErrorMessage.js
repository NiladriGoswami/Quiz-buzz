const ErrorMessage = ({children}) => {
    return(
        <div style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
            backgroundColor: "rgb(192, 99, 99)",
            textAlign: "center",
            color: "white",
            textTransform: "capitalize"
        }}>
            {children}
        </div>
    );
};
/*It's taking all the children inside the form component and rendering inside it.*/

export default ErrorMessage;