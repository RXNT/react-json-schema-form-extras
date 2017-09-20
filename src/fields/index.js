import TableField from "./TableField";
import AsyncTypeaheadField from "./AsyncTypeaheadField";
import TypeaheadField from "./TypeaheadField";
import CompositeArrayField from "./CompositeArrayField";
import AltInputField from "./AltInputField";
import IMOTypeaheadField from "./imo/IMOField";

export default {
  table: TableField,
  typeahead: AsyncTypeaheadField,
  typeaheadOptions: TypeaheadField,
  compositeArray: CompositeArrayField,
  altInput: AltInputField,
  imo: IMOTypeaheadField,
};
