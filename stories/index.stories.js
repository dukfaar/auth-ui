import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import LoginForm from '../static/js/components/loginForm'
import ClientPage from '../static/js/components/ClientPage'
//import AuthUiApp from '../static/js/components/auth-ui-app'
import { store } from '../static/js/redux/store'

import '../static/js/redux/initialReducers'
import '../static/js/redux/login/reducer'

import { Provider } from 'react-redux'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('LoginForm', module)
  .addDecorator((getStory) => (
    <Provider store={store}>
      { getStory() }
    </Provider>
  ))
  .add('form itself', () => <LoginForm/>)



storiesOf('ClientPage', module)
  .addDecorator((getStory) => (
    <Provider store={store}>
      {getStory()}
    </Provider>
  ))
  .add('the clientpage', () => {
    store.dispatch({
      type: 'SET CLIENTS', clients: [
        { clientId: 'cake', clientSecret: 'meow', grants: ['abc', 'def'] },
        { clientId: 'cake2', clientSecret: 'woof', grants: ['abc'] }
      ]
    })
    return <ClientPage />
  })
