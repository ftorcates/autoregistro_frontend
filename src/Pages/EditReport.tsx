import { FC } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Report from "../Components/EditReports/Report";

interface RouteParams {
    id: string
}

interface EditReportProps extends RouteComponentProps<RouteParams> {

}



const EditReport:FC<EditReportProps> = (props) => {

    const history = useHistory();

    const reportId = props.match.params.id;
    console.log(props);
    return <Report id={reportId} history={history}></Report>
}

export default EditReport;