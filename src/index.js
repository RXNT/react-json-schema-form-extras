import table from "./table";
import { AsyncTypeaheadField, TypeaheadField } from "./TypeaheadField";
import CompositeArrayField from "./CompositeArrayField";
import AltInputField from "./AltInputField";
import CollapsibleField from "./CollapsibleField";
import RTEField from "./RTEField";

export default {
  table,
  asyncTypeahead: AsyncTypeaheadField,
  typeahead: TypeaheadField,
  collapsible: CollapsibleField,
  compositeArray: CompositeArrayField,
  altInput: AltInputField,
  rte: RTEField,
};
