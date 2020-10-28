import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Link, Route } from 'react-router-dom';
import { Paper, Card, CircularProgress, CardActions, CardContent, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '50px auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: 'fit-content'
    },
    card: {
        textAlign: 'left',
        display: 'flex',
        width: '66%',
        margin: '0 auto',
        marginBottom: '15px'
    },
    cardContent: {
        padding: '1em'
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
    },
    questionnaireLink: {
        color: 'black',
        textDecoration: 'none'
    },
    link: {
        color: '#be294f',
        textDecoration: 'none'
    },
    progress: {
        display: 'block',
        margin: '100px auto'
    }
});

export function QuestionnairesList({ questionnaires, deleteQuestionnaire, isLoadQuestionnairePending }) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            {
                isLoadQuestionnairePending ?

                    <div className={classes.progress} >
                        <CircularProgress color="secondary" />
                    </div>

                    :

                    !(questionnaires.length === 0) ?
                        <div>
                            <h1 className={classes.h1}>QUESTIONNAIRES</h1>
                            {questionnaires.map(({ id, questions, owner, preText, postText, title }) =>

                                <Card key={id} className={classes.card}>
                                    <Grid item xs={9}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant='h5' component='h2'>
                                                {title}
                                            </Typography>
                                            <Typography color='textSecondary'>
                                                Questions: {questions.length}
                                            </Typography>
                                        </CardContent>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <CardActions className={classes.cardActions}>
                                            <Button>
                                                <Link
                                                    className={classes.questionnaireLink}
                                                    to={{
                                                        pathname: "/clinic/questionnaires/edit-questionnaire",
                                                        state: {id}
                                                    }}
                                                >Edit Questionnaire</Link>
                                            </Button>
                                            <Button
                                                
                                                onClick={() => {
                                                    deleteQuestionnaire(id)
                                                }}>
                                                Delete Questionnaire
                                    </Button>
                                        </CardActions>
                                    </Grid>
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <h1 className={classes.h1}>YOU HAVE NO QUESTIONNAIRES</h1>
                            <h3><Link className={classes.link} to={`/clinic/questionnaires/add-questionnaire`}>Add some today</Link></h3>
                        </div>
            }
        </Paper >
    )
}

QuestionnairesList.propTypes = {
    deleteQuestionnaire: PropTypes.func,
    updateQuestionnaire: PropTypes.func,
    questionnaires: PropTypes.array,
    isDeleteQuestionnairePending: PropTypes.bool,
    isDeleteQuestionnaireSuccess: PropTypes.bool,
    isDeleteQuestionnaireFailed: PropTypes.bool,
    isLoadQuestionnairePending: PropTypes.bool,
    isLoadQuestionnaireSuccess: PropTypes.bool,
    isLoadQuestionnaireFailed: PropTypes.bool,
}

QuestionnairesList.defaultProps = {
    deleteQuestionnaire: () => { },
    updateQuestionnaire: () => { },
    questionnaires: [],
    isDeleteQuestionnairePending: false,
    isDeleteQuestionnaireSuccess: false,
    isDeleteQuestionnaireFailed: false,
    isLoadQuestionnairePending: false,
    isLoadQuestionnaireSuccess: false,
    isLoadQuestionnaireFailed: false,
}

export default QuestionnairesList;