import React from "react"
import {Redirect, Switch, NavLink} from "react-router-dom";
import { apiUrl } from "./util";
import axios from "axios";

export class Register extends React.Component{
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            confirmPassword:"",
            name:"",
            telephone:"",
            email:"",
            address:"",
            redirect:false
        }
    }
    render(){
        let text={
            border:"1px solid #03a9f4",
            padding:"10px",
            width:"400px",
            borderRadius:"5px",
            marginBottom:"15px"

        }
        let button={
            width:"420px",
            color:"white",
            fontWeight:"bold",
            textTransform:"uppercase",
            backgroundColor:"#03a9f4",
            padding:"10px",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
        }
        return(  
            <div style={{display:"flex", flexDirection:"column", height:"100%", width:"100%", alignItems:"center", justifyContent:"center", marginTop:"50px", position:"fixed"}}>
                <input style={text} type="text" value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder="username"/>
                <input style={text} type="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="password"/>
                <input style={text} type="password" value={this.state.confirmPassword} onChange={(e)=>{this.setState({confirmPassword:e.target.value})}} placeholder="confirmPassword"/>
                <input style={text} type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="name"/>
                <input style={text} type="text" value={this.state.telephone} onChange={(e)=>{this.setState({telephone:e.target.value})}} placeholder="telephone"/>
                <input style={text} type="text" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="email"/>
                <input style={text} type="text" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} placeholder="address"/>
                {this.state.error?
                    <div style={{color:"red", backgroudColor:"pale red", borderRadius:"5px", padding:"10px", marginBottom:"15px"}}>Please ensure all the fields are filled and their respective formats are correct.</div>    
                    :null}
                <button onClick={()=>{
                    if(this.state.address && this.state.confirmPassword && this.state.email && this.state.name && this.state.password && this.state.telephone && this.state.username){
                        if(this.state.password===this.state.confirmPassword){
                            let url=apiUrl+"owners";
                            let options={
                                url:url,
                                method:"POST",
                                data:{
                                    name:this.state.name,
                                    email:this.state.email,
                                    password:this.state.password,
                                    phoneNo:this.state.telephone,
                                    address:this.state.address
                                }
                             
                            }
                            axios(options).then(r=>{
                                this.setState({redirect:true})
                            }).catch(e=>{
                                this.setState({error:true})
                            })
                            
                        }
                    }
                    else{
                        this.setState({error:true})
                    }
                }}style={button}>Register</button>
                <div style={{color:"#03a9f4", opacity:"2", fontSize:"30px", fontWeight:"bold"}}><NavLink to="/login">Login</NavLink></div>

                {this.state.redirect?<Switch><Redirect to="/login"/></Switch>:null}
            </div>
        )
      
    }
}