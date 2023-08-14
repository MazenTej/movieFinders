import React from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Avatar
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  user: {
    display: 'flex',
    alignItems: 'center',
  },

  userName: {
    marginLeft: theme.spacing.md,
    fontWeight: 500,
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavBarProps {
  user: string;
}

export function Navbar({ user }: NavBarProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = [
    { label: 'Movies', link: '/movies' },
    { label: 'Series', link: '/series' },
    { label: 'Documentaries', link: '/documentaries' },
  ].map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <div className={classes.user}>
        <Avatar size={28} radius="xl" color="blue">
            MT
          </Avatar>
          <span className={classes.userName}>{user}</span>
        </div>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}