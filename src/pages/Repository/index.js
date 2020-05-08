import React from 'react';

import { Browser } from './styles';

export default function Repository({ route }){
  return <Browser source={{uri: route.params.repository.html_url}} />
}
