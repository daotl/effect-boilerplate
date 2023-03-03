export class BogusEvent
  extends MNModel<BogusEvent, BogusEvent.ConstructorInput, BogusEvent.Encoded, BogusEvent.Props>()({
    _tag: prop(literal("BogusEvent")),
    id: defaultProp(StringId, StringId.make),
    at: defaultProp(date)
  })
{}
/** @ignore @internal @deprecated */
export type BogusEventConstructor = typeof BogusEvent

export const ClientEvents = smartClassUnion({ BogusEvent })
export type ClientEvents = ParsedShapeOfCustom<typeof ClientEvents>

// codegen:start {preset: model}
//
/* eslint-disable */
export namespace BogusEvent {
  /**
   * @tsplus type BogusEvent.Encoded
   */
  export interface Encoded extends EncodedFromApi<typeof BogusEvent> {}
  export const Encoded: EncodedOps = {}
  /**
   * @tsplus type BogusEvent.Encoded/Ops
   */
  export interface EncodedOps {}
  export interface ConstructorInput
    extends ConstructorInputFromApi<typeof BogusEvent> {}
  export interface Props extends GetProvidedProps<typeof BogusEvent> {}
}
/* eslint-enable */
//
// codegen:end
//
/* eslint-disable */