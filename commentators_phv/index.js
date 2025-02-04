LoadEverything().then(() => {
  if (!window.config) {
    window.config = {
      size: "normal",
    };
  }

  Start = async (event) => {};

  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

    if (
      Object.keys(oldData).length == 0 ||
      Object.keys(oldData.commentary).length !=
        Object.keys(data.commentary).length
    ) {
      let html = "";
      Object.values(data.commentary).forEach((commentator, index) => {
        html += `
              <div class="commentator_container commentator${index}">
                  <div class="name"></div>
                  <div class="pronoun"></div>
                  ${
                    window.config.size == "normal"
                      ? `<div class="real_name"></div>`
                      : ""
                  }
                  ${
                    window.config.size == "normal" ||
                    window.config.size == "mini"
                      ? `<div class="twitter"></div>`
                      : ""
                  }
              </div>
          `;
      });
      $(".container").html(html);
    }

    for (const [index, commentator] of Object.values(
      data.commentary
    ).entries()) {
      if (commentator.name) {
        $(`.commentator${index}`).css("display", "");
        SetInnerHtml(
          $(`.commentator${index} .name`),
          `
            <span class="mic_icon"></span>
            <span class="team">
              ${commentator.team ? commentator.team + "&nbsp;" : ""}
            </span>
            ${await Transcript(commentator.name)}
          `
        );
        SetInnerHtml($(`.commentator${index} .pronoun`), commentator.pronoun);
        SetInnerHtml(
          $(`.commentator${index} .real_name`),
          commentator.real_name
        );
        SetInnerHtml(
          $(`.commentator${index} .twitter`),
          commentator.twitter ? "@" + commentator.twitter : ""
        );
      } else {
        $(`.commentator${index}`).css("display", "none");
      }


    }

    let matchTexts = [];
    let phaseTexts = [];

    // Contenu pour l'élément `.match`
    if (data.tournamentInfo.tournamentName) matchTexts.push(data.tournamentInfo.tournamentName.toUpperCase());
    if (data.score[window.scoreboardNumber].match) matchTexts.push(data.score[window.scoreboardNumber].match.toUpperCase());
    SetInnerHtml($(".match"), matchTexts.join(" - "));

    // Contenu pour l'élément `.phase`
    if (data.score[window.scoreboardNumber].phase) phaseTexts.push(data.score[window.scoreboardNumber].phase.toUpperCase());
    if (data.score[window.scoreboardNumber].best_of_text) phaseTexts.push(data.score[window.scoreboardNumber].best_of_text.toUpperCase());
    SetInnerHtml($(".phase"), phaseTexts.join(" - "));

  };
});
