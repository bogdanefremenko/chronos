import { createTRPCProxyClient } from '@trpc/client';
import { ipcLink } from 'trpc-electron/renderer';
import type { AppRouter } from '../electron/router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
});
