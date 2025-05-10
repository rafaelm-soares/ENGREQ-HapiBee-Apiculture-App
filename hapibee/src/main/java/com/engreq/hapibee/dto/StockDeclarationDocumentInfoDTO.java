package com.engreq.hapibee.dto;

import java.time.LocalDateTime;

public class StockDeclarationDocumentInfoDTO {

    //StockDeclarationDocumentInfo que vai para o front end para mostrar

    public Long documentNumber;
    public int version;
    public String declarationType;
    //Dúvida
    public String year;
    //duvida
    public String officialBeekeeperId;

    /*
    //não faz sentido não usar
    public String state;
     */

    //data da submissão
    public LocalDateTime submissionDate;

    /* Não usar por agora
    //data de quando foi guardado úlitima vez
    public String declarationDate;
     */
    public String unidadeOrganica;
    public StockDeclarationTotalApiaryInfoDTO details;

}
