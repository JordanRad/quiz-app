import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

export default function RouteWrapper({
    component:Component,
    isPrivate,
    ...rest
}){
    
    return <Route component ={Component}/>
}
RouteWrapper.propTypes ={
    isPrivate:PropTypes.bool,
    component:PropTypes.oneOfType([PropTypes.element,PropTypes.func])

}

