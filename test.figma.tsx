import React from 'react';
import { figma } from '@figma/code-connect';

figma.connect(
  'https://www.figma.com/design/AtkvJF5a578wIAU2AkCttH/Blue-Collar-Clicks?node-id=208-1289&t=4sDThcJTHjy3bzrp-4',
  {
    name: 'Test Component',
    example: () => <button>Hello</button>,
  }
);