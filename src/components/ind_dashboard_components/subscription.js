import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Modal } from 'react-bootstrap/';
import EASForm from './subscription-forms/eas-form';
import EFAForm from './subscription-forms/efa-form';
import RMForm from './subscription-forms/rm-form';
import LMForm from './subscription-forms/lm-form';
import EasModal from './subscription-pages/eas/eas_sub_page/eas_sub_page';
import EfaModal from './subscription-pages/efa/efa_sub_page/efa_sub_page';
import RmModal from './subscription-pages/rm/rm_sub_page/rm_sub_page';
import LmModal from './subscription-pages/lm/lm_sub_page/lm_sub_page';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));



export default function Subscription() {

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('key'));
    //console.log(userData);
    setUser(userData);

  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  const [User, setUser] = React.useState({});

  const [easmodal, setEasmodal] = useState(false);
  const [efamodal, setEfamodal] = useState(false);
  const [rmmodal, setRmmodal] = useState(false);
  const [lmmodal, setLmmodal] = useState(false);


  const toggleEas = () => setEasmodal(!easmodal)
  const toggleEfa = () => setEfamodal(!efamodal)
  const toggleRm = () => setRmmodal(!rmmodal)
  const toggleLm = () => setLmmodal(!lmmodal)

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-lg-3 col-sm-6">
            <br />
            <Card className="">
              <CardActionArea>

                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="data:image/jpeg;base64,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"
                  title="Contemplative Reptile"
                />
                <CardContent onClick={toggleEas}>
                  <Typography gutterBottom variant="" component="h5">
                    Educational Advisory Services
                      </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                      </Typography>
                </CardContent>

              </CardActionArea>
              <CardActions>
                <EASForm user={User} />
              </CardActions>
            </Card>
          </div>
          <div className="col col-lg-3 col-sm-6">
            <br />
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM2nnYlMAWbiH-aoT5qd4WOp-w0OVX5GdfcxBuazaKM6rsUB1w"
                  title="Contemplative Reptile"
                />
                <CardContent onClick={toggleEfa}>
                  <Typography gutterBottom variant="" component="h5">
                    Education Finances Advisory
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <EFAForm user={User} />
              </CardActions>
            </Card>
          </div>
          <div className="col col-lg-3 col-sm-6">
            <br />
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVGBUWFhUXFRUWFRUVFhUWFhUVFRcYHSggGBolHRUVITEhJSkrLi4vGB8zODMtNyktLysBCgoKDg0OGxAQGy0lHyUwLS01LS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKABOgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAgMEBQcAAf/EAEUQAAIBAgMFBAUJBgYBBQEAAAECAwARBBIhBRMxQVEGImFxBzKBkdEUFyNSVJKTobFCRHKCwdIWM0NTYvAkNHODwuEV/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQBAgUABv/EADERAAICAQMDAwIEBgMBAAAAAAECABEDBBIhMUGhIjJRE5EFFGGxFUJSgeHwM3HBI//aAAwDAQACEQMRAD8AxNWIr0WPhSTXCr3IqSUjPnSt3XYcVJmawtx6mmFUEXAEm47ss94Ada0f/Q9lZ3spRmFvca0JP8n2VqaMeiZWuPqEAdryd4hhcfn7DVU0IPqn2Hj7OtXO24u8aopNKQ1PDm5o4OVFTwpbjXZaUs/I606EB9U+w0sAD0h7rrIxFLhQmnWhPOrLYmEzuFHOrpjJapVnAW5FGFNta7dUfbU7ObqIMRyoKnIBNMPjCwCZd8aSKpCxqfOoxlrt6KqGAlypMlFKkQYcHjVeMaOBqRDi7VZXW5Uq0nPEBwphhXkmNqMcTVmcSoUx8iu3dRxMaWJutVsS1GOiGkSQUk4vpTMs5NVJWSAZrfo6VpMAFYGyu4Q/WF7m3kSRQ92yiCE3uOlq0z0fYLLszDKwsTHn8RnYv/WgftnjMI0xR5RZTZmAJt14cTSWRPUSI5iaxUzIzAHmaPOw2ElmZc65E/WrrZew9mzKHwrLIBxP7V/+QPCpu28YuDgLKBm4L5mmMen7mL5NSeiwe9MGzo5Gjlg7zQpllA1st7qfZrWVGtC2ZtErmLG+e5a/O/GhXa+BiLFonAufU6eXhVsmGhaymPLZoymry9P/ACNuorvkL9PzFL7G+IxuHzI968NPnAyfUJ8taZliZSVYFSOIIsaqQR1kgiJJrgaTXtRJnt64mvKSwrp0WDS7VHWn66dGq4V1qWulSBOMm4cW8/0pyVbU3hakTjSnFHpirH1Ttm+sK0XCn6MeVZ5s4d4Uf4Zvox5VoaP2mZ2v6iC+3gLnlQxOmtE+3uJoZkGtKaz3RzSe2MWpUR1r0vSoEuaSA54jZPEnxsSNdRRF2ShG9Ujrwqnih7tX/Y7DkzL1J0FaGNSCLiOVhtMO+3EX/ji3T+lYrjFIY1vPbGFRAMxHDiTYflxrFtoYGN2OSVc3Q5l9xNDyoSoqRp8gBNymz17a9dPEyNlcEEU7h47m1J0bqP2KuMFKtNlYRmNrUsbObTQ1oHYfYy8XFvOj48JuzA5MwAgRjdnFNaryQK0Dt3g7NaNS3lQI+zpzwhf8qvkUjoJTHkUjkiR2kpBenm2biP8AZf8AKnsLsPESmwjI8TYCg05NUYXeg7j7yDnqywOzXaxy3ZtI1+sTpc+FEmyuyqxd6Tvtx4d0eQom7B7N32JM7DRSQg6BeJ99GXCVG54JswbhYWbdwuMOEiweEIV8iCSU6AKoAKr4n9KyHtTsiU4xcISoYkBivC9rk1vu2Norh4jIRc6BV6sdAKyXDYR58acQzBVDjMx4sxv3EHP4ClXAd1FTQ025MLsTQ/8AZcbI7IxQBTEWR1AGYH1v4hzFDfbXaDSSiO9wmlxwJ5mtE2g+SJ2UMSBYBVZzc+CisixEDMzMCGsTmtcFTfUMp1FaCCZG7mzG89hUOVC3BdOvM0tIpMRKsEK5nY2tyv1J5AcSeVq1jZvYjBxQgTEyPbvvdlF+YRQdB53NBy5lXgxnHhZhYmPLhSONOiGtjw3YnCRBs4MpJNjJplXktlsL+P6VT7a7CxyKHwkgRjxjlJyHoUksSPIg0NdRjupc4MlXMyvl18aK9t7OjxuAMyWM+HXNccWQauh66ajyoe7Q7KnwriOeNozyJHda/wBVuDew1O7N7T3DXC8dCQ3EdCOYoxpxUCbU3AQV5Vr2j2cIZiF/y378Z/4nl5jUe6qrLWewINR0EEXFLXPS4oWPKnThjzIFcFJkbgJCXjT9LEaDib07ePoakJ8mdv8A0kYdTXeNeGuFSJ0m4YVLmXSomFqc4JFOYx6Yq/uiMB6wo8w3qeyg3Z+EbMDb8xRhHotrgG3C4p/SClMztawJEHNucTQxKNaK9qYGRjpl+8o/rVU3Z7EHXKtv41+NLapGZuBGtNlRV5IlLalwDWrN+z2IH7K/fX400mx5lPeC/fX40n9JwehjX1sZHDD7y5wQ7lX3ZOwnHXQeznVPhISqa2H8wq57OIVmVvEVqgcCZuRgbmibRfDkXxO73e7dVWS4XOw7jE2soFtSeF71QdpINmGELI+ARzgxAjqWYx4oWvIAqZiq/XtfXUC9WHaV4REd7e1hltn6G9ivA+rx00rOpH2SXAYsRrmFsULi4sDb9u2bUaeHCszUL35j+kb0wZZ95FrZmjYLfqrXt7LjTzp7ZUIcrby91S9lbOKxM76BbSPflYHdp5km9uld2bgJkQe33miBDalpX6incF7QsGzcoU2on2HDYV2Nw4CLpyq17JwEG9qdZgqkiZrLvPJkLFzxpHKshK51IBVe+TlYAZiCMpJ1Bt1vSJdu4QuzKAq3k7uS+Ys8LCTw7qMuXlbxqT6SMMhju1YZj4Y8xyp/33Uo9Eb66/r/AIjeJDWwHp+n+Zr0k2GfOqyg3xG/W8LWyWYbph0uR4GntrTpJIGQki2ullBuxsgsDlsRxoA9H+zx9JJltwAo03VHw9m/39oLNj6rfj/MZ2g2WJj4W9p0or7D4Pdxr1tr+tBe247rGn1pUB8r3/pWg7Hay2qNQ1ipODHtlL6Qdpd5YwfVBb2nQflVJ2egzyxDXu3It/DmcjxPCqjtNjzLipembKPIaf0q87LtlEslr7sCw693vD2jSsnC15p6jUqMWir/AK8xztCPlSYpRihD8jh3pTk2cOpU94ZRplvYm7D2ie1MLPA2IhkcSS4REfeqS4CNk+idiLlSshIzcMhA0apkW28WTbDzQMiM8iCRcOssZvmswkF89wBcEqcoNxoBU4nGSzM7SziaWQBSQwaKCDOJGRWHduWVdE7oAI/a0dXfvoTGOwJzO2FjTgZZcQkeYbu2axOTeMjD2kjLrRF2Z7TPtHFamTLEufKAO83AFrX0Gp9gpmXCKMDIGNjMV7tuCRAhL+Opqh7EbeGBEiboGSQ6vmGbJyHHSxv4d6g6rCxyGlP2hdJlH0wSZqxm3j5L9wasfDkvt/pXm0sVmYQxC7t7lHNj0AoVj7QLHHcuuZrsVH7PRb8G00uKRD2lSGIsO9K+rf8A1W/QfGl/ymf+g/aMnPi/qH3hskoKbmeXMh7rKyKVZSLEEX4VlXbbsscDIJIWL4ZzZW4mNtTu3PlwPOx5jWBtHbuIdr5wPAMPjVlg9qb/AA02HlcFnQ5ATcbyOzoPO4t7aLiTMjcqftBZTiZeolXu/lOHZCLvGC8fU29ZfaKDjijyAFEuznljkVkZAQQdWFjVf2v2fu584XKkozgDUA/tKD0vr7aPqFYDdUWwlbqVKzMedeOTXkYpcg0pSyYzQkcU7am6XUSZ1einMleBKIFlLkrCirFCBUHDLUtxpTuPhYrk5Mttnyrcd4e+jzY22EihyHN/mrLdTYFVEfcPeHHIeIYa8KzDA+sKM4U+j9lO4UGRKMztQTjcEQik7awqD3QhOc3EgW8jqQz3FitzbhwtUX/FuFLBzIEcxtGWjaNchaVpc8V2vfvZSDbQnWgHa0epqkkSlsqKhoDzGkDZBZbwJrT9t4A6urxgh5W9dDdCkm5RjzCvKzHTp0FJl7c4UoY0+jGTdpkkByjMTqVdCeJvr7DWRGImpmztnvI1o1LHmeQoNBjQWE2bBZb9pqsXa1CwkjQoc7MxRgN4hgMaBgNMwOU355Bzqm2SSZLk3JNyb3JJNyT4kmq7BYKwtmzHoouB7asdjwssguCPMWrQTEEHAiD5N3eX/a3EFYRbpwIuPdWWz7SAa+VV/hUA/ePCtM7Ym8Q8qyTGx96lc7FQKjOlVWHMXjNqtIAlsqA3CAnU/WY/tGr/ALJC0ijmSL0LRRa36UUdjbmZfOgYmYuCY1lVVQ1NkGEBUFuAFTdkyDPZRYCq3GTkqEWpWyJApsPbTTg7DMdP+UMTIfpCkRY7sL+FYxjNtIGOWJPaL/rWq+keQGPXTSsSxoQMbXNAZ2RBU0cWJHYkzTuxWOBguY1FzyFqv2VG9U2PQ0K9lGAiC9Ap94q0mnI4U0psC4u+OmO2dtVCJIQf9xfh/Wio4jdxO/1VJ/KhrFS72NSfWUqynxU3tTnbHaGTBOQfXyqP5iKBqBS7ofSHfkCHrYgXhpd5JmPG5NXONxm7wDEaGV2t5A2/pQ3suS2vhU3tfiQiRR8kQfebU/rWbox6i3wJ6H8Vb/5qg7mUsu1G0VgrdSy3PhrUnDbTAtYDwFgFB65RxPnVHChOp8zVngtnyOLotlHFzoB7a08WR74mBlx4wOZYttJmUoz3BN+PM/0ok2J2xjw8UMbRsREc18wsTvJWOVSbKbOveGvdI4HQPGzb8GL/AMKkj30yZWhbVSRzVhx9/A+NTnLMLIk4doNAw4TtxEGVs0vcMpy7yyymRCqtJdywZDoO82gGorpe2+GZ94VOYCVVGdMuWUwlixOpZd0bH9rNc21oDxeHRhmQ3U8OoPRhyNVc0dqRGrA/k8mOnS3zu/aaZF25UMuYs6AYkFDICrLNKrItuAyxh08M2lS27fQ5SN26ABAArC2VM9kNmW4syjUHgdKylWpnEyki1VbU7j7f3kjTgD3TV9u9pco3kSPDvYMS5yNlDPOUKTWHNMpJtzYkcTQTFj454/k00gtxjkP+m/K5+qeBoo23BfZ2HkHrwrGynrG6qGB8L2PsNDYwsMg3iR3NiTF6ykqLuE53A72XmDpwpquOB1ioMHcRhGico4sR7QRyIPMGmpTpV5jsPh5FBhZkYf6Ml7f/ABvy/hNUcqmlHQrGVYGRjTlqTanMhoUJclErTYAriK8C0yTAyfhl8akshqNhlqRIKbT2xVusfwK94UZRD6OgzAXzCjSE9ytDS+2ZutPIgztRdTVQ6VfbTU34VTyIb8KBqF9UawN6Y2sPADi2lEXytY4d0otGpGcj1pZPq36CqVbKQSeFScXlywqTodSf4mIJ/KqL6QTOyr9QqDLqB5skZKmKOXSMkFI21CkhuBAJ1Ptq+TZ8+GxnyYsJXsrWjJcEMCbWte9gf1o/kwmCgTBkBcikph88rSJ3yFUIrEglswIPLlpVhOuFbGxpZBIilkyHI4VgwJutsw7jC1L/AJ5vjsYc6FKIme9qYt5DpoRxHC1ZjPg7k3Nat2rVFmZI/VNwRmLWYg5wSdb361luJQhgevxo70yBqimnJVmS+kjPhwBoL3NXPZqQxvmygWok7ObJwckWzTOLPLiMQrKIldZwsgASZiwyqBw0PGrfZ+w4Gkw0ywxfJ1jxHyhrJkEiNIF3n/Id23kKWTKqv0jr4yydZ0W0+7fnbSpuyNqKpuxqbhNn4T/x2dEGVIEkj/3nxCxCNyOdi0pP8IpuHZce6eO0QmkGIkjBJ3qhX+gVNLZSI3vrzFMHPjYUQYj+XdDYIlL20n362TXz0rNJuz05b1Vtf6wrZtp4DDlcQyBQ0WH1jP12SN1mj6HVlPjY86jDBQfJFOSIv8lklsIzv2cMQJBJcCy6XWxNqq/0mUcGFxtmUkWIB7LhmjlfQZSqgd4cVq1Z2YcNaMtp7LRMSgXCB4s/BMOqkjck/wCZvfpQG1K5Vvbw1ZxOycm93cOHnxA3JWLdZFWJ82YmEvYSXABN9BY1K5sfwZzJlvqIHrIwBX3a1X9qcU8mGijHENc69AbfnR3i9ixSOow0aOExqiWxU5YN3EXViTrGGMg9lqRiMBhGhJ3UL3G0XVFivPIIp5BFuJcwC5Rl01uBpwqubKjYyKMvgR1yhrHEyvZ8bZgDwNufLnUbb+IM0pPJSR7q1TB7Gj+VwKuDw7YNoxu8Ru1d53OFZjnkzd7vX7thqopnAdnVaWVGwMSsRFkmbAqIE9bOJMP8oJUn/cDcBwFtUU24wQO8082VsxBbtMtwcGZlQ6Dix6Aan8qLN6026iRBZiEgiuFDE6Z3J0ofTD5ZZAStg7rdfUNnIuv/AB008LUdejzCxTbTGZ0vhlzRwm+aVgjAFeXd0Y+YNPDJ9PGWma+IZcqg9pw2BBhWjba+OSG4v8jiztIVNwMzRm6DyHHnURux7YhWk2XjYsdFm78Mn0ckSm9r5zqPHunzqp9G+NXE7Z32MZhIxklU5iCJrg2OnBU3mh0soFSNjzrhu0YXCE7tp9yy3LXD2EyMTxAfMf5R0pA58hN3Hxgx1VQMxkAAEkZIVtDrcow5G3EVW4hHGra258iOtGna/ZcWHxeNghkV4wS4CggQtvWG5Pio006ihmMlSUPT+l7URkDgN8waOVJX4lWjmpuHhsQX93TxNIcAagfmRTMsxItwHT40EKqdesOSWmlvG8+zMOIjmbJu8g1Z2ZwoUdCMp49RQZs/GbtxckLcXI4qwPdceIPLpcV52a248DRi9kWQSNx9Qld4B42T9ac7R4dY5iqWs3eFiOZPTTlemBksXAHHXEKdqSRmQo6pZgrLIBbR1zAnQ6HUXt+yaENu4FkJawtwuBbjwuOGvUaGpM2075Hbgp3bf+2QCp9hDGpqzqgbDTAMGymJwbgxyC4HiBy8RVnIcVKqpU3A7PS8xrsVCUdkPFSR8DSKR5jUmZDXqqakZ/CkiQ07tEW3GS8LG1SXTrUfDsetPOacStsVa7krAZQwoxgcZOFBuAPeFGEDDJT2D2zM13USj2rJqaoZdTV7tWQXNUskuvChajrGtN7Yy6aVMSLexAD1o76dVOpt5Gojz0iDFFWBU2I50ragxkqxFiHB7Sq0OBj3TD5I+Hdjde/uY0QhRyvlNr1bx9p0mxq4gRMAIXiykre7NIb9Ld8e6guLHRuO+mvVTa/s4Vb7FaPMMqnzZhaipp8Zr/esBl1WVQTUI9sAuXdRrI7lRzu7E/lmoE21lSXJx3YsSOvP86Mtu7S3SXXV7WB5L5VmGOxOp1uSbk9a7OwRQIvoEfIxY9I7LOlj3b8jw18+tWOxpUZh3BfTXShwy8qtdiS2YUpiyEuJqZcY2GHohXKdBoL2/WndlQB9AAPZVOdp5WB99EGyFGYMuqnh8DWmXNcTHbGF6jrI3aHLANRfnpYUN4TbiOzDdHQX4jX8qvO3r6UFbKS0cj9TYewUq+fIGAjeHTY2xkkR6XtPEG/yDof+NFcUiOisFBUi44W1rK8TxNF/ZPEOINe8uYgDpQcOqyFypjGbR4goIEucSVvbJfly0qNtSMd2PJc2BI08/wAtKtsGBbeNwHAdT0qVgcBctNJwGop0WRzM/I6YzY7fvAXbgRXyZAbAX0HHib03hcEhQMyqBx4D4V5tvXEMOV7++om1MaWtGmirp50g7AMTNPGCVAnu0dpXOVBpV12e2iYMVhsfdgI2UTBAC1spVtCQDmU/rzoWjS1ScJjGjN1PgRyI6Ec6Du3WH6GGKVRTqJp8GxMJjsUMZsnGxYfEOXY4XECzK8isshjGuYEM2gBAvxHCnNlrs/ZOKfFYzGJisYzyHLh0zrh3csZJH19a7EW0tc6dM6ix0WYOFeNwbhonKkHqOanXkacikS+ZVAJJJeVsxuTcm1tTz51UacE+7iSdQQPabk7AYV5S2YkyTEySMeIW5Zna3Akm9r0P7RmzSSMBpew/75CrbEbZyo0UJPf/AMyU+s/h4CqhCCQBw/XqaPlK7QixfCH3M7SOWuNeNRmFXW2oAoRgOI/SqRjrSWQUaMeQ2LE4G1LaUniSdANTfQcB5U3euofSE6x0PoR1/pr8akPLmhQ84yV/lJzr7jmHtqInGlxHuuOoHvDA1YGVIkrbVmMcn1k181JW/utVfT+MmDZAP2V/M6mmaqxs3JUUJOBpSivVXwp1Y6eCkxUmPQU6a6GKntwabRDUXZhcVgzYij1dh4gKbqtlHeO8jsp7vdY5tG766HXvCgnCYa586Ok23ie85cNnUKQwJUKLGyrfu6gcKOFyhfRX94lnbFfrlRiuzE73JygAXZt5FZNI2s5zd1rSxmx5MKhr2KlbUsALZic8VkXdmUNJ3+4CilgTa4qfjO1OJFwXPq5AV7rIlowVQg90fRIfvdajx9tZU4XDWyl1VBI1ozEpZxqSqMQDQMgy/wA1eYdClem/E8+buY2vn1z29S30frG+bh068qZ/wG4GYM5Bj33BSd33btYG4tnU242IqZ84Mgvo3eJLAKliS7OSRf6zsaTJ6Qnb6/gQEBWzRsApHAXiTTwoVHvXmWtu27xEL2KlBy5gG7+haMG0ZYO1i3qgqwzcNK82dsvI9s9yCRyI0NuIOtPDt4+bPlGfv94oma0hZmW4Pq3diByvXbK2isslyCMxLsdLC5udPbTGC93Nf2i2pJCGr8R7tDBdONZ5joQCdT7q1XaCPId1BE8j5S2RbA5V4lifMaeIrNcTj4nPejIB5hjfzseNV1e08XzJ/DS+y6NSlZasMA9jTOMgKEEHMrag9eoI5EdK9ga1Z6ja01mO5ZbTTm9F/ZDHEaHUdKAXkol7NzWp/E9tUQ1OMHHCPtfCso7rAHoTb86HF2NIuHsFJvc6a0x2pxhvxrzFYxkgUBraCuYpuN9pTEmRUFGUx7PzE6rYdToPzoj7L4eOEMjOH4HKvC/DjQo+IdvWe3tq/wCyckSFiSXOngKDiKB/SPvD5hkKeo/2ELoMCZmDN3UX3CpMm0AZYoQVWLMAzHl4mqzE7UZhYaDoKhK3M02zcUIiuC2DN26CV3bxkOLZ0IIyhQ1rZ8umehbd9dKuNuMXxAHOyqPbVkIEGSLDxvJI1x3VzSysAS27FjlUWOtr6Gk/pg2SeBNH6pWgBZMFWQDr7q8WK/Oiduz2NY2OzMT9ybN+n9Ko8Rhwl2W9gcrKRZkYcVYew+6hUp6G4Xcw6io0uCB/aPuq0wnZWaXLkVjnGZfV1XeiG+p+uQP/AMqtGLA5GrzZ/bqeFURD3IwAqG5XSYT5iuaxbMAL9LjneiH6YHFeZUb+8bfsdMM9w30ce+YgowEVyM4KsQwuDwvwNSf8DYhGbMrgxsit6mjSZcg9bnnXyzC9q9h9IE6yb3i5WNCSoN1jN1uC2p5HqKkQ+kSbQWB5G6Kc5yxqGY3vmAiTUW4c+V1OP4XzKkZP18RWP7KTyKI8j5k3hIst7RkK/E8iy+dxa9UjdiJ2ta2qbyxkhUiPu2dgzgoDnW2a3GiuTtriUhEgI7hWxKKzWD5wpv8As3t42Ua6VTJ6SJ0N1jjBtlLZGDMMqKMzLIDoI0AsRw51TPsvkL5k4d/yfEpx2HxhtliYgokgIKZSjtkQhs1jc8r358KYk7I4wcIs3f3ZKvG6h8pbKxViFNgeNWi+kbFKAq5Mq5bKUJAyqqr+1c6IOfM9aRL6Q8YWLDdrmLFgFchsyZDmzuTawBFiLFRakHrtHF3d5Q7T2PNhym9CjOuZbOj3XSzdxjob6VDY2FSsbj3myF7fRxxxLYW7kYst/HXjUWSqS8YpdIpdROluL0sUpGPmKeTKeIt+layLcz2adGKdtTkeHvw18uPupW6ptUNQBYXH8CDcUWRHuUMYJDcUToe5TeMUJmaw2RBzaTamqpjVrtEamqxloOUcx3B7Yw9qQLU5IlNWpRhGhJCgVednv80DqR+WtD4q02O9nBouI+oRfULaGar2CjgeeUSqpkK90sDcISEax4as6jqbihrYOwEnmSUwYeLCHI27bCwO+YyKskauULGO2chyc1sotzpK7Vkw0m/gVXYqFKNflJHJpYi+sYHtoKgkmWOaMxH6XL9IzOm7ynMCuoHHrek9bgY5SR3qH/D86DAATyJAMJdZUIsRKLLbLlJLAgKPV4cOVqhRpoPbRCiJDCXY3Y33Y5yO2hf+EcjzvQ+W4C3D9edVZNoF9YRMm8tXS5KhhB4i9FHZvCo0iI2YB2VLrbMCxCg66WuR+dCSTWoh2JOTzpnTkE1AagMBfaFWO7JQSRySKXLocQEVt2SxgMagZR3jmZwLjRbi9Ssd2GiLqhYsncW9lNpPlEULjS4taUML69aF8fNIjAq5HHmefHnzsL0P4vbmIQ2VgBe/Pjprx46DXwFRk9BNt4E7EN4FDzDlPR5hmy94FXYBWVVsyHEQQg25N9M1weDJ0r3Adh4o13is0im5UQKpaRTNHEhXN6ts5z3HdKnzrN37RYgcGA56ZhrcG/HqAfYKsuzm0pXucxBF7FSQRfjbXS9Lq4Z6B8CMHGwWyPMIZ48jOpFirMtja4ysRY20vpyqNK9eu551D32Y04zCKqpuU20ZiJyRyFvytRJ2POIXaSzYeETHCo8pjL7sGMRbo2Njr9KDYAk0H497yP8AxGr7Ym35o1b5O8ayMoR88cbGRB+yGdTbldeBsDSDW4ZRHgApDGa7h8dtKHHYqdsJh2Rkl1V5A0nyYruo75SQRvWAJQBuOlhWO7SwcsWLxcU6hXJlZ0DZlUt9KAGHG2Ya1LHaDaWVIrLkjN0BgisDaxJJTW9he51sKkNiWnd8TjJEJtaR1REz2NwncADuTa56Cq6fC4eyJ2ozps4NwRmjK5geVvzqPUnHz5mZubMWt0vwH51EvVXIB4l0sjme05CdaZzUuJtaoDzLEcQsy5sJIPC/uoPmFGOyiGidb8VP6UISiiajsZTD1MYtXtq6vRSkZi0pMtLSkyipkSPTlIpdVky/RKdVaXGlPpH1reRJks86KOpSueevnXkcVPhKcRaizMDH8GFJHFfzFEKx93r5VQ4WPWrxNFo1TO1PUSg2hFqaqpIjV/i5ddQD/wB61XvAp4HL58PfQ3W43hyEDmU8gpqrSfCkanUdRrUNkXxpR8ZjqZARGQastkDvCoe7PKp+ykOYV2NTuEpmPoMtttQ3Qa0LOGB0Fz1Ov60Y7RXuUOMovRM6bjFtI9LUp5w7G5JJ6mnMPgianSLVjs2NelLppwzcxx85VeJWDZh6Vd7JweWrEwLUjDwi2lOLgVORM/Jqiy1Knay6igvaTjOaM+0Rt7qBcXJcms7WHmaehHoBkWU0QdlVshPVrflQ5Iautj4sIsa8yzfpSWAj6lx3KCUoS/x0ulVULPmsAOXPlT+LlubU1E9qcY2YsooSBLGtnY2ubkHne/8A3SoApBXX2k17SO6OVHkxBHj5617PjHe2Y3twHIeQpikmu3mqkbBPWNIJriaSWoZMuBPSa9VqbvXoNVuTUv8AYswBHwqvx8YV2XxNIwU4B405tBlLX8ONHJtIICmkMqOtdl8RXpA6/lXqoOooNQlxax+VJkjNLWM/9NeSIelSRxIvmRsh6UrJXG4pWY1ShLzdF9Dk4/eovuP8adX0Qzj95i+4/wAa1+uo41uYdD4ECdLjPaZKnonnH7zF9xqX81U32iL7rVq9dVx+I6j58CUOiwnt5MyyL0XTA/8AqI/utU4ej2a1t9H91q0Wuqf4jqPnwJRvw3Tt1HkzLZvRfM3DERD+Vqjt6J5z+8xfdetarqj+I6j58CWGhwjoPJmRD0S4gcMVGP5X+NKPolmPrYiE+ORga1uuqPz+f58CW/J4vjyZkR9EMvLER/dapGF9Fk6HXERn+Rq1W1dXDX5h38CQdFhIojyZmmK9Gsri2/jH8rVUSeh/EH96i+4/xrYaqf8A+ZIWLGQ6GQp33JGZkIBOnd7vq2tw41Da7O3U+BOx6HCntHkzLz6GsR9ri+4/xqXhfRLOn7zEf5H+NaDPsqVx3nvZDGPpJF4gDObcyRw8eOlOwbOlDXaViM+a28a2W0tlAsLWLpzN8gOlQuszA2D4Eu2lxMKIgT82s32iP7rU7H6O5h/rx/daitNlTDXeEnKqm8soJCsxsWHEkN6wA9W1rGlSbLmOX6W5VlbOWbvARshXLwS+b1lN9eoq/wDENR8+BAH8N057eTM+2v6J8RMdMVEvmjn+tUbegjEn99h/Cf8AurZcThJWJIa11UWEjqBle7DQa5hpm4ryvTI2XNa5nbNy772FkQC4vY95WOvHNrQMmd35YxrHhTGKUTHD6A8R9ti/Df409g/QTiEbN8shNuH0b/GtuaBt4H3jBQpUx2XKSSCHJtmuLEcbamq59mN3rJELzpMup0y7vMfU0Y5D9469RhiDYhCARUy0+hfE/a4fw3+NJ+ZXE/bIeH+2/wAa01Nhsua27JMscgvcWKStIWvlNmIOW35m9gqXY7HP3Iu/IGNiRZVvYr3O7J1bUm51GlifXf5lPpL8TJn9BGIP77DwH+m/xpHzDYn7bD+E/wDdWt4/s/nzlcgLvmOlgBu2ReA1ILM3jc6jjXk2wXYOM6rmYN6tw5DyOGkGne746+oPID3GX2iZN8w2J+2w/hP/AHV58w2J+2w/hP8A3VvNdUbjOoTBT6BMR9th/Cf+6vPmDxH22L8N/jW911dZnVME+YLEfbYvw3+Nd8wWI+2xfhv8a3uuqLkzB4fQPiFN/lsP4T/GnMT6C8Qxv8shHD/Tf41uldVtxqpG0XcwX5hMR9ti/Df4178wuJ+2w/hv/dW811RcmYOPQRiftsP4T/3Vx9BGJ+2w/hP/AHVvFdXbjIoTBvmGxP26L8N/jSvmIxP26L8J/jW711dZnUJ//9k="
                  title="Contemplative Reptile"
                />
                <CardContent onClick={toggleRm}>
                  <Typography gutterBottom variant="" component="h5">
                    Recruitment  Management
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <RMForm user={User} />
              </CardActions>
            </Card>
          </div>
          <div className="col col-lg-3 col-sm-6">
            <br />
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlDxYMQX6TQvAHVADOD5FEsrrV6iqAguLxYIVRZ6Y42B-5tV1R"
                  title="Contemplative Reptile"
                />
                <CardContent onClick={toggleLm}>
                  <Typography gutterBottom variant="" component="h5">
                    Leadership <br /> Management
                    </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                    </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <LMForm user={User} />
              </CardActions>
            </Card>
          </div>
        </div>

      </div>
      <EasModal isOpen={easmodal} toggle={toggleEas} user={User} />
      <EfaModal isOpen={efamodal} toggle={toggleEfa} user={User} />
      <RmModal isOpen={rmmodal} toggle={toggleRm} user={User} />
      <RmModal isOpen={lmmodal} toggle={toggleLm} user={User} />
    </>
  );
}
