import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Alert = ({alerts}) => {

    const renderAlert = alerts.map(alert => {
         return (
            <div key = {alert.id} className = {`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>

         )


    })

    return (
        <div>
            {renderAlert}
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}


const mapStateToProps = (state) =>(
    {
        alerts: state.alert
    }
)
export default connect(mapStateToProps)(Alert); 

