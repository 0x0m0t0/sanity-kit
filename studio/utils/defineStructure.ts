import type {ConfigContext} from 'sanity'
import type {StructureBuilder} from 'sanity/desk'

export default function defineStructure<StructureType>(
  factory: (S: StructureBuilder, context: ConfigContext) => StructureType
) {
  return factory
}
