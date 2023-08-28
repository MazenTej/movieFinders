// deno-lint-ignore-file
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Avatar,
  Select
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    marginBottom: "300px"
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
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>; // Add prop type
  selectedGenre: string; 

}

export function Navbar({ user,setSelectedGenre,selectedGenre }: NavBarProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [dropdownVisible, setDropdownVisibility] = useState(false);
  const { classes } = useStyles();
  const dropdownAvailable = user ? true : false;
  
  const onMouseEnter = () => {
    setDropdownVisibility(true);
  }

  const onMouseLeave = () => {
    setDropdownVisibility(false);
  }

  const items = [
    { label: 'Movies', link: '/movies' },
    { label: 'Series', link: '/series' },
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
  const genresOptions = [
    {value: 'all', label: 'All'},
    { value: 'action', label: 'Action' },
    { value: 'drama', label: 'Drama' },
    { value: 'comedy', label: 'Comedy' },
    {value: 'documentary',label:'Documentary'},
    {value: 'horror',label:"Horror"}
    // Add more genres as needed
  ];

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Select
          data={genresOptions}
          value={selectedGenre}
          onChange={(value: string) => setSelectedGenre(value)} // Specify the type of 'value'
          placeholder="Select Genre"
        />
        <div className={classes.user}>
          {user ? <div className="dropdown"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Avatar size={28} radius="xl" color="blue" ></Avatar>
              {dropdownVisible && <DropdownMenu />}
            </div> : ""}
          {user ? 
            <span className={classes.userName}>{user}</span>
          : <a key='sign-in' href='/login' className={classes.link}>
              Sign-in / Sign-up
            </a>
          }
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