import React from "react";
import {NavLink,Switch,Redirect} from "react-router-dom";
import {apiUrl} from "./util";
import axios from "axios";
import bg from "./bg.jpg"

export class Login extends React.Component {
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            redirect:false
        }
    }
    componentDidMount(){
        this.props.loggedIn&&this.setState({redirect:true})
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.loggedIn !== prevProps.loggedIn && this.props.loggedIn){
            this.setState({redirect:true})
        }
    }
    login(){
        if(this.state.username!=="" && this.state.password!==""){
            let url=apiUrl+"auth/owner";
            let options={
                url:url,
                method:"POST",
                data:{
                    email:this.state.username,
                    password:this.state.password
                },
                headers:{
                    "Content-type":"application/json"
                }
            }
        
            axios(options).then((resp)=>{
                this.props.loginSuccess(resp.data);
                localStorage.setItem("owner",JSON.stringify(resp.data));
                this.setState({redirect:true});
            }).catch(err=>{
                this.setState({error:true})
            })
        }
        else{
            this.setState({error:true})
        }
    
    }
    render() {
        let text={
            border:"1px solid #03a9f4",
            padding:"10px",
            width:"400px",
            borderRadius:"10px",
            marginBottom:"15px"
        }

        let button={
            width:"420px",
            color:"white",
            fontWeight:"bold",
            textTransform:"uppercase",
            backgroundColor:"#c02906",
            padding:"10px",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
        }
        return (
            <div style={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div style={{width:"100%", height:"100%", position:"fixed", zIndex:-99, overflow:"hidden", opacity:"2", backgroundSize:"cover"}}><img src={bg}/></div>
              
             
                <div style={{marginTop:"60px", position:"fixed"}}>
                    <div>
                        <input style={text} type="text" onChange={(e)=>{this.setState({username:e.target.value})}} placeholder="Email" value={this.state.username}/>
                    </div>
                    <div>
                        <input style={text} type="password" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="password" value={this.state.password}/>
                    </div>
                    {this.state.error?
                    <div style={{color:"red", backgroudColor:"pale red", borderRadius:"5px", padding:"10px", marginBottom:"15px"}}>Your login credentials are incorrect. Please enter them again.</div>    
                    :null}
                    <div>
                        <button 
                            style={button}
                            onClick={()=>{
                            this.login();
                        }}>
                            Login
                        </button>
                    </div>
                    <div style={{color:"#be483d", textDecoration:"none", fontSize:"30px"}}><NavLink to="/register"><b>Register</b></NavLink></div>
                </div>
              
                
                {this.state.redirect?<Switch>
                    <Redirect to="/employees"/>
                </Switch>:null}
            </div>
        )

    }
}