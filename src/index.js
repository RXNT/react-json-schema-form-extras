import table from "./table";
import { AsyncTypeaheadField, TypeaheadField } from "./TypeaheadField";
import CompositeArrayField from "./CompositeArrayField";
import AltInputField from "./AltInputField";
import CollapsibleField from "./CollapsibleField";
import RTEField from "./RTEField";
import rdp from "./ReactDatePicker";
import SimpleLabel from "./SimpleLabel";
import draftRte from "./DraftRte";
import formContextField from "./FormContextField";

export default {
  table,
  asyncTypeahead: AsyncTypeaheadField,
  typeahead: TypeaheadField,
  collapsible: CollapsibleField,
  compositeArray: CompositeArrayField,
  altInput: AltInputField,
  rte: RTEField,
  rdp,
  simpleLabel: SimpleLabel,
  draftRte,
  formContextField,
};
