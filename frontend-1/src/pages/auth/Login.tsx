// deno-lint-ignore-file
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton, GoogleIcon } from './GoogleButton'
import { signInUser, signUpUser , signInWithGoogle, signInWithCredentialGoogle} from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getRedirectResult } from 'firebase/auth';

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const onSubmit = async () => {
    if (type === 'login') {
      await signInUser(form.values.email, form.values.password)
      navigate(-1)
    } else {
      try{
        await signUpUser(form.values.email, form.values.password)
        await signInUser(form.values.email, form.values.password)
        navigate(-1)
      }
      catch(error){
        setError('Email already in use')
      }
      
    }
  }

  const withGoogle = async () => {
    try{
      const result = await signInWithGoogle()
      // @ts-ignore
    }
    catch(error){
      console.log(error)
      setError('Error signing in with Google')
    }
  }


  return (
    <Paper radius="md" p="xl" withBorder {...props} styles={
      {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '500px', margin: 'auto'}
    }>
  

      <Group grow mb="md" mt="md">
      <Button leftIcon={<GoogleIcon />} variant="default" color="gray" radius="xl" onClick={withGoogle}>
        Sign in with Google
      </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      {
        error && <Text color='red'>{error}</Text>
      }
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" color='violet'>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}