import { React, useEffect, useState } from "react";
import MemberCard from "./../../../components/cards/membersCard/MemberCard";
import '../aboutUsPage/AboutUsPage.css';
import Button from '../../../components/buttons/Button';
import { useSelector, useDispatch } from "react-redux";
import { loadMembers } from "../../../app/slices/members";
import ClickedMemberCard from "../../../components/cards/membersCard/clickedMemberCard/ClickedMemberCard";
import AnimatedPage from '../../../components/AnimatedPage';
import {Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const AboutUsPage = (props) => {
// dejamos de usar redux por que daba conflictos.
//const { membersList } = useSelector(state => state.members)

const [clickedMember, setClickedMember] = useState({});
const [members, setMembers] = useState([])
const navigate = useNavigate()

const scrolling = window.scroll(0,0, 'smooth')

//const dispatch = useDispatch();
const URI = 'https://somosmas-backend.herokuapp.com/admin/members'

useEffect(() => {
  
  axios.get(URI).then((response)=>{
    console.log(response.data) 
    setMembers(response.data)
    setClickedMember(response.data[1])
  })
  //dispatch(loadMembers());
}, [ URI ]);

  return (

    <AnimatedPage>
      <section className="aboutSection" >
        <h1 className="aboutTitle" id="main">¡Nuestro Staff!</h1>
        <div className="aboutContainer">
          {(
          <>
            <div className="clickedMemberContainer">
              <div className="clickedMemberAndBtn">
                  <h2 className="clickedMemberName">{clickedMember.name}</h2>
                  <h5>{clickedMember.role}</h5>
                  
                  <p>{clickedMember.content}</p>
                  <Link to="/contact"><Button className="serParteBtn" text='¡Quiero ser parte!' type="button"/></Link>
                  <div className="MV_container">        
        </div>
              </div>
              <ClickedMemberCard className="clickedMemberCard" key={clickedMember.id} image={clickedMember.image} />


            </div>


            <div className="cardMember_section">
            {( members.map(member => (
                  <>
                      <div className="memberCardContainer" onClick={() => setClickedMember(member)}>
                      <MemberCard onClick={scrolling} key={member.id} name={member.name} image={member.image} />
                      </div>
                  </>
                  
            )))}
            </div>
          </>
          )}
        </div>
        <div className="SPB" style={{ display: "none", minWidth: "200px"}} >
        <Link to="/contact"><Button className="button-primary" text='¡Quiero ser parte!' type="button" style={{ minWidth: "200px"}}/></Link>
        </div>
      </section>
    </AnimatedPage>

  );
};

export default AboutUsPage;
