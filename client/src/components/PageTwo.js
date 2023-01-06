import React, {useEffect, useState} from 'react';
import { FaArrowRight} from 'react-icons/fa';
import { MdReportGmailerrorred } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SuccessModal from './SuccessModal';
import { logout} from '../auth';
import { useForm } from 'react-hook-form';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import TokenExpiredModal from './TokenExpiredModal';
import ErrorModal from './ErrorModal';

const PageTwo = ({ onButtonClick, courseName }) => {
    const {register, watch, handleSubmit, setValue, reset, formState:{errors}} = useForm();
    const [showModalCourseAdded, setShowModalCourseAdded] = useState(true);
    const [showModalTokenExpired, setShowModalTokenExpired] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    useEffect(
        ()=>{
            fetch(`/course/course-by-name/${courseName}`)
            .then(res=>res.json())
            .then(data=>{
                setValue("course", data.id);
            }) 
            .catch(err=>console.log(err))
        },[]
    );

    const createTopic = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        
        const requestOptions = {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(token)}`
          },
          body: JSON.stringify(data)
        }
        
        fetch('/topic/topics', requestOptions)
        .then(async res => {
          let response = await res.json()
          if(response.msg == "Token has expired"){
            logout();
            setShowModalTokenExpired(true);
          }
          else if(response.status == 1){
            setValue("title", "");
            setMode(MODES.SUCCESS)
            loading()
          }
          else{
            setShowModalError(true)
          }
              
        })
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
      }
      const [mode, setMode] = useState(MODES.LOADING)

      function loading(){
        setTimeout(function(){ 
            setMode(MODES.LOADING)
        }, 2000);
    }
      
      
    return(
        <PageWrapper>
            {showModalCourseAdded?<SuccessModal content="course added successfully."/>:null}
            {showModalTokenExpired?<TokenExpiredModal/>:null}
            {showModalError?<ErrorModal/>:null}
            <div className='course-full text-light'>
                <div className='course-learn mx-auto'>
                    <div className='course-sc-title'>What you'll learn</div>
                    
                    <ul className='course-learn-list'>
                        <BlackInputWrapper>
                            <div className="form__group field">
                                <input type="text" className="form__field" placeholder="Learn Item" name="learnItem" id='learnItem' required
                                {...register("title", { required: true })}
                                />
                                <label htmlFor="learnItem" className="form__label">Learn Item</label>
                                <input type="hidden" required 
                                {...register("course", { required: true })}
                                />
                            </div>
                            {errors.title && errors.title?.type ==="required" && <div className="error-section"><MdReportGmailerrorred className="icon"/> <p className="error">Learn item is required.</p></div>}
                        </BlackInputWrapper>
                    </ul>
                    <div className='course-btn'>
                        <Link to="#" className='add-to-cart-btn d-inline-block fw-7 bg-purple mt-4' onClick={handleSubmit(createTopic)}>
                            <RiAddCircleFill /> Add 
                        </Link>
                        <p className='checkMark'><AnimatedCheckmark mode={mode} baseColor='#ab12e3' collapseFactor={1} size={50}/></p>
                    </div>
                </div>
                <div className='next mx-auto'>
                    <div className='course-btn'>
                            <Link to='#' className='next-btn d-inline-block fw-7 bg-purple mt-4' onClick={()=>{onButtonClick("pagethree", courseName)}}>
                                Next <FaArrowRight/>
                            </Link>
                    </div>
                </div>
            </div>
            
        </PageWrapper>
        
    )
}

const BlackInputWrapper = styled.div`
.error-response{
  display: flex;
  color: red;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 2rem;
}
.error-section{
  margin-top: 0.5rem;
  display: flex;
  color: red;
  height: 0.5rem;
  font-weight: bold;
}
.error{
  margin-left: 5px;
  font-size: 1.1rem;
}
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 5px;
  margin-left: 0px;
  width: 90%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 30px;
  }
}

.form__label {
  position: absolute;
  top: 0px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: white;
       
  }
  padding-bottom: 6px; 
  border-width: 3px;
  border-image: linear-gradient(to right, white, #9b9b9b);
  border-image-slice: 1;
}

.form__field{
  &:required,&:invalid { box-shadow:none; }
}
`
const PageWrapper = styled.div`

.next{
    max-width: 992px;
    padding: 0px 28px 22px 28px;
    text-align: right;

    .next-btn{
        padding: 12px 28px;
        span{
            margin-left: 12px;
        }
    }
      
}
.checkMark{
  display:table-cell
}
.course-btn{
  display:inline-table;
    .add-to-cart-btn{
      margin-right: 10px;
      padding: 12px 28px;
      span{
        margin-left: 12px;
      }
    }
  }

  background: var(--clr-dark);
  color: var(--clr-white);
  .img{
    min-width: 500px;
  }
  
  .course-full{
    padding: 40px 16px;

    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }

    .course-learn{
      max-width: 992px;
      border: 1px solid white;
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        margin-left: -20px;
        li{
          margin: 5px 0;
          display: flex;
          span{

            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{

        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }
`;

export default PageTwo