import { Component } from "react";
import { Document } from "src/model/myTypes";
import styles from "./viewDeclaration.module.css";

type OwnProps = {
  declaration: Document;
}

type Props = OwnProps;


class ViewDeclaration extends Component<Props> {

  renderApiaries() {
    const details = this.props.declaration.details;
    return (
      <div className={styles.details}>
        {
          details.listApiarysWithInfo.map((item, index) => {
            return (
              <div className={styles.subItem} key={index}>
                <div className={styles.infoLine}>
                  <span className={styles.label}>ID Apiário: </span>
                  <span className={styles.value}>{item.apiaryId}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Município: </span>
                  <span className={styles.value}>{item.apiaryLocation.municipality}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Fregusia: </span>
                  <span className={styles.value}>{item.apiaryLocation.parish}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Lugar: </span>
                  <span className={styles.value}>{item.apiaryLocation.place}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Latitude: </span>
                  <span className={styles.value}>{item.apiaryLocation.latitude}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Longitude: </span>
                  <span className={styles.value}>{item.apiaryLocation.longitude}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Nome do lugar: </span>
                  <span className={styles.value}>{item.placeName}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Número de colmeias: </span>
                  <span className={styles.value}>{item.hiveNumber}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Cultura intensiva: </span>
                  <span className={styles.value}>{item.culturaIntensiva ? 'Sim' : 'Não'}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Zona controlada: </span>
                  <span className={styles.value}>{item.controledZone ? 'Sim' : 'Não'}</span>
                </div>
                <div className={styles.infoLine}>
                  <span className={styles.label}>Transumâncias: </span>
                  <span className={styles.value}>{item.transfer ? 'Sim' : 'Não'}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span>{this.props.declaration.year} v{this.props.declaration.version}</span>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoLine}>
            <span className={styles.label}>Número do documento: </span>
            <span className={styles.value}>{this.props.declaration.documentNumber}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Versão: </span>
            <span className={styles.value}>{this.props.declaration.version}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Ano: </span>
            <span className={styles.value}>{this.props.declaration.year}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Tipo de declaração: </span>
            <span className={styles.value}>{this.props.declaration.declarationType}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Data de submissão: </span>
            <span className={styles.value}>{this.props.declaration.submissionDate}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>ID do apicultor: </span>
            <span className={styles.value}>{this.props.declaration.officialBeekeeperId}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Unidade orgânica: </span>
            <span className={styles.value}>{this.props.declaration.unidadeOrganica}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Quantidade de apiários: </span>
            <span className={styles.value}>{this.props.declaration.details.totalApiaryNumber}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Quantidade de colmeias: </span>
            <span className={styles.value}>{this.props.declaration.details.totalHiveNumber}</span>
          </div>
          <div className={styles.infoLine}>
            <span className={styles.label}>Quantidade de modulos: </span>
            <span className={styles.value}>{this.props.declaration.details.totalHiveSuperNumber}</span>
          </div>
        </div>
        {this.renderApiaries()}
      </div>
    )
  }
}

export default (ViewDeclaration);
