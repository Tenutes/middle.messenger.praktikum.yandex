import Link from '../../components/Link/link';

const linkProps: LinkProps = {
  href: '/chat-list',
  label: 'К чатам',
  classes: 'text-blue decoration-none hover:underline duration-200',
};

export default {
  link: new Link(linkProps).getContent(),
};
