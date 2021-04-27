  
import { Button, Container, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src={`${window.location.origin}/assets/logo.png`} /> Log-in to your account
      </Header>
      <Form size='large'>
        <Container>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Container>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginForm