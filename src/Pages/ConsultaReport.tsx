import { FC } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Report from "../Components/Reports/Report";

interface RouteParams {
    id: string
}

interface ConsultaReportProps extends RouteComponentProps<RouteParams> {

}



const ConsultaReport:FC<ConsultaReportProps> = (props) => {

    const history = useHistory();

    const reportId = props.match.params.id;
    console.log(props);
    return <Report id={reportId} history={history}></Report>
}

export default ConsultaReport;