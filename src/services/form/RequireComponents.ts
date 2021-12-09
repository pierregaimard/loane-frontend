import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

interface Component {
  name: string
  config: never
}

export const RequireComponents = (): Component[] => {
  const componentsList = require.context(
    '../../components/form',
    false,
    /App[A-Z]\w+\.(vue|js)$/,
  )
  const components = <Component[]>[]

  componentsList.keys().forEach((fileName) => {
    const componentConfig = componentsList(fileName)
    const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))

    components.push(<Component>{
      name: componentName,
      config: componentConfig.default || componentConfig,
    })
  })

  return components
}
