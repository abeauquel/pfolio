import React, {Component} from 'react';



class ToastNotifcation extends Component{

    componentWillMount () {
        window.Materialize.toast(this.props.message, 4000)
    }
    render(){
        return(
            <div></div>
        )
    }

}
export default ToastNotifcation;