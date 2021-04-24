import { App } from 'vue';
import parsePath from 'parse-filepath';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function registerGlobalComponents(app: App): void {
  // Load global components from @/components/_global
  const req = require.context(
    '@/components/_global',
    true,
    /^((?!stories).)*\.(js|ts|vue)$/i
  );
  for (const filePath of req.keys()) {
    const componentName = parsePath(filePath).name;
    if (!componentName) continue;
    const componentConfig = req(filePath);
    app.component(componentName, componentConfig.default || componentConfig);
  }

  // Legacy import of all components with naming based on directory structure
  // This should be phased out by adding non-global folders to the excluded regex
  // Once all auto imported components are removed we should remove this
  const requireComponent = require.context(
    '@/components',
    true,
    /^((?![\\/]cards|[\\/]dialogs|[\\/]forms|[\\/]modals|[\\/]images|[\\/]navs|[\\/]tables|[\\/]heros).)*\.vue$/
  );
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    );
    app.component(componentName, componentConfig.default || componentConfig);
  });
}
