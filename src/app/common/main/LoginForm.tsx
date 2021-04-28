  
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Grid, Header, Image, Message } from "semantic-ui-react"
import { useStore } from "../../stores/store";

export default function LoginForm() {

  const history = useHistory();
  const {userStore} = useStore();

  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSignIn() {
    setAuthenticating(true);

    userStore.signIn(email, password)
    .then(response => {
        setAuthenticating(false);

        // TODO: use users DB for persisting and resolving roles
        const role = email.split('@')[0];
        if(!role) {
          setError('Role is not resolved');
        }
        if(role === 'employer') { 
          history.push('/employer/personnel');
        }else{
          history.push('/recruiter/home');
        }
    })
    .catch(error => {
        setAuthenticating(false);
        setError(error.message);
    });
}

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={`${window.location.origin}/assets/logo.png`} /> 
          Welcome to HR-Sample
        </Header>
        <Form size="large" onSubmit={handleSignIn}>
          <Container>
            <Form.Input
              id="email" 
              name="email"
              type="email"
              value={email}
              fluid icon="user" iconPosition="left"
              placeholder="Email Address"
              onChange={event => setEmail(event.target.value)}
            />
            <Form.Input
              id="password"
              name="password"
              type="password"
              value={password}
              fluid icon="lock" iconPosition="left"
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
              autoComplete="off"
            />

            <Button 
              content="Login" 
              loading={authenticating}
              color="teal" fluid size="large"
            />
          </Container>
          {error && <Message color='red'>{error}</Message>}
        </Form>
      </Grid.Column>
    </Grid>
  )
}
