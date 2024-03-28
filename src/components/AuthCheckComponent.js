import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { restoreAuth } from '../redux/authReducer/action'
import { connect } from 'react-redux'

const AuthCheckComponent = ({restoreAuth}) => {

    useEffect(()=> {
        const storedAuthToken = Cookies.get("savedtok")
        console.log(storedAuthToken)
        if(storedAuthToken){
            restoreAuth(storedAuthToken)
        }
    } , [restoreAuth])

  return null
} 

const mapDispatchToProps = {
    restoreAuth
}

export default connect(null , mapDispatchToProps)(AuthCheckComponent)