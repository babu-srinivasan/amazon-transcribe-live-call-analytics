// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { AppLayout, Flashbar } from '@awsui/components-react';

import { Logger } from 'aws-amplify';
import useNotifications from '../../hooks/use-notifications';

import StreamAudio from '../audio-streamer/StreamAudio';
import { appLayoutLabels } from '../common/labels';

import Navigation from './navigation';
import Breadcrumbs from './breadcrumbs';
import ToolsPanel from './tools-panel';

const logger = new Logger('StreamAudioLayout');

const StreamAudioLayout = () => {
  const { path } = useRouteMatch();
  logger.debug('path', path);

  const notifications = useNotifications();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <AppLayout
      headerSelector="#top-navigation"
      navigation={<Navigation />}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      breadcrumbs={<Breadcrumbs />}
      notifications={<Flashbar items={notifications} />}
      tools={<ToolsPanel />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      content={
        <Switch>
          <Route path={path}>
            <StreamAudio />
          </Route>
        </Switch>
      }
      ariaLabels={appLayoutLabels}
    />
  );
};

export default StreamAudioLayout;
