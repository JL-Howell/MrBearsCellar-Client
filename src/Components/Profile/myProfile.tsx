export default {}

// import React from "react";
// //Reactstrap
// import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col, Button } from "reactstrap";
// //Components
// import EditProfile from "./EditProfile";
// import ContactUser from './ContactUser';
// import APIURL from '../../../helpers/environment'

// type Props = {
//   token: string
// }

// type State = {
//   profileInfo: any,
//   profileUpdate: any,
//   profileUpdateActive: boolean,
//   contactModal: boolean,
//   postNum: number
// }

// export default class ProfileDisplay extends React.Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       profileInfo: {},
//       profileUpdate: {},
//       profileUpdateActive: false,
//       contactModal: false,
//       postNum: 0
//     }
//   }

//   fetchMyProfile() {
//     fetch(`${APIURL}/post/find`, {
//       method: 'GET',
//       headers: new Headers({
//         'Content-Type': 'application/json',
//         'Authorization': this.props.token
//       })
//     }).then(res => res.json())
//       .then((profileData) => {
//         this.setState({
//           profileInfo: profileData
//         })
//       }).then(() => {
//         this.findLengthOfPosts()
//       }).catch(err => console.log(err))
//   }

//   componentWillMount() {
//     this.fetchMyProfile()
//   }

//   updateProfile() {
//     this.setState({
//       profileInfo: this.state.profileUpdate
//     })
//   }

//   updateOn() {
//     this.setState({
//       profileUpdateActive: true
//     })
//   }

//   updateOff() {
//     this.setState({
//       profileUpdateActive: false
//     })
//   }

//   contactModalOn() {
//     this.setState({
//       contactModal: true
//     })
//   }

//   contactModalOff() {
//     this.setState({
//       contactModal: false
//     })
//   }

//   findLengthOfPosts(){
//     this.setState({
//       postNum: this.state.profileInfo.posts.length
//     }) 
//   }


//   render() {
//     return (
//       <Container>
//         <Card className="profile-info">
//           <Row>
//               <Col md="4">
//                 <CardImg className="profile-img" src={this.state.profileInfo.ProfileImg} alt="pet pic" />
//               </Col>
//               <Col md="8">
//                 <CardBody className="profile-body">
//                   <CardTitle className="profile-username">{this.state.profileInfo.username}<Button className='primary-btn edit-profile-btn' onClick={() => {this.updateOn()}}>Edit Profile</Button></CardTitle>
//                   <div className='post-pet-data'>
//                   <p className="post-number">{this.state.postNum}</p><p>posts</p>
//                   {this.state.profileInfo.adoptionRecruiter ? 
//                       <p className="adoption-recruiter-label">adoption specialist</p>
//                       : <p className="adoption-recruiter-label">pet enthusiast</p>
//                     }
//                     <p className="profile-contact" onClick={() => {this.contactModalOn()}}>contact</p>
//                   </div>
//                   <CardSubtitle className="profile-bio">{this.state.profileInfo.bio}</CardSubtitle>
//                   <CardSubtitle>{this.state.profileInfo.adoptionRecruiter}</CardSubtitle>
//                 </CardBody>
//                 {this.state.profileUpdateActive ?
//                   <EditProfile
//                     profileInfo={this.state.profileInfo}
//                     updateOff={this.updateOff.bind(this)}
//                     token={this.props.token}
//                     fetchMyProfile={this.fetchMyProfile.bind(this)} />
//                     : <></>
//                 }
//                 {this.state.contactModal ?
//                   <ContactUser 
//                     profileInfo = {this.state.profileInfo}
//                     contactModalOff={this.contactModalOff.bind(this)}
//                     contactModal={this.state.contactModal}
//                   /> : <></>
//               }
//             </Col>
//           </Row>
//         </Card>
//       </Container>
//     );
//   }
// }