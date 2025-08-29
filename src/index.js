import AltInputField from "./AltInputField";
import CollapsibleField from "./CollapsibleField";
import CompositeArrayField from "./CompositeArrayField";
import RTEField from "./RTEField";
import SimpleLabel from "./SimpleLabel";
import dateTimePicker from "./DateTimePicker";
import draftRte from "./DraftRte";
import formContextField from "./FormContextField";
import rdp from "./ReactDatePicker";
import table from "./table";
import { AsyncTypeaheadField, TypeaheadField } from "./TypeaheadField";
import { DebouncedStringField } from "./DebouncedStringField";
import MultiSelectField from "./MultiSelectField";

export default {
  StringField: DebouncedStringField,
  altInput: AltInputField,
  asyncTypeahead: AsyncTypeaheadField,
  collapsible: CollapsibleField,
  compositeArray: CompositeArrayField,
  dateTimePicker: dateTimePicker,
  draftRte,
  formContextField,
  rdp,
  rte: RTEField,
  simpleLabel: SimpleLabel,
  table,
  typeahead: TypeaheadField,
  multiSelect: MultiSelectField
};
