import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card,Col,Row } from "antd";
const { Meta } = Card;

const Training = () => {

  const navigate = useNavigate();
  const induction = (e,department) => {
    e.preventDefault();
    navigate(`/Dashboard/Training/${department}`);
  };
  // const FO = (e) => {
  //   e.preventDefault();
    

  //   navigate("/FOc");
  // };
  // const STORE = (e) => {
  //   e.preventDefault();
   

  //   navigate("/Storec");
  // };

  // const POWER = (e) => {
  //   e.preventDefault();
   

  //   navigate("/Powerc");
  // };

  return (
    <div>
      {/* <select id='selectsuccess' className='box' name='designation' >
            <option selected>--Select Dept--</option>
           <option value="Option1">INDUCTION</option>
            <option value="Option2">STORE</option>
            <option value="Option3">POWER</option>
            <option value="Option4">FO</option>
          </select>
          <br/>
          <div style={{paddingTop:"15px",marginLeft:"10px"}} className='sub-1'>
          <input type="submit" value="SUBMIT"/>

          </div> */}

      {/* <input type="submit" value="INDUCTION" onClick={induction} /> */}
      <Row gutter={16}>
      <Col span={5}>

      <Card
        onClick={(e)=>induction(e,"induction")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title="INDUCTION CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>

      <Card
       onClick={(e)=>induction(e,"FO")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title="FO CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
        onClick={(e)=>induction(e,"STORE")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title="STORE CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"POWER")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" POWER CABLE CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"AISG")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" AISG CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"ENTERPRISE")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" ENTERPRISE CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"RF")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" RF CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"OFC")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" OFC CERTIFICATE" />
      </Card>
      </Col>
      <Col span={5}>
      <Card
       onClick={(e)=>induction(e,"AUTOMOTIVE")}
        hoverable
        style={{
          width: 240,
          marginLeft: "40px",
          marginTop: "20px",
        }}
        cover={<img src={process.env.PUBLIC_URL + "/images/induction.jpg"} />}
      >
        <Meta title=" AUTOMOTIVE CERTIFICATE" />
      </Card>
      </Col>
      </Row>

    </div>
  );
};

export default Training;
