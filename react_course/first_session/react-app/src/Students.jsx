import PropTypes from 'prop-types'

function Student(props){
    return(
        <div className="Student">
            <p>
            Name, {props.name}
            </p>
            <p>
            Age= {props.age}
            </p>   
            <p>
            Student Status ={props.isStudent? "Yes":"No"}
            </p>
        </div>
    )
}

// Good for debbug
Student.propTypes = {
    name: PropTypes.string,
    age : PropTypes.number,
    isStudent : PropTypes.bool,
}

Student.defaultProps = {
    name : "Guest",
    age : 0,
    isStudent : false,
}
export default Student      