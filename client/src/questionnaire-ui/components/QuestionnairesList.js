import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Card, CardActions, CardContent, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
        marginTop: '50px',
        padding: '3em 0em',
        minHeight: '75%',
        height: 'fit-content'
    },
    card: {
        textAlign: 'left',
        display: 'flex',
        width: '83%',
        margin: '0 auto',
        marginBottom: '15px'
    },
    cardContent: {
        padding: '0px 1em'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
    },
    link: {
        color: '#be294f',
        textDecoration: 'none',
        margin: '10px'
    }
});

export function QuestionnairesList({ questionnaires }) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            {!(questionnaires[0] === null) ?
                <div>
                    <h1>Questionnaires</h1>
                    {questionnaires.map(({ id, title }) =>

                        <Card key={id} className={classes.card}>
                            {console.log({id, title})}
                            <Grid item xs={9}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant='h5' component='h2'>
                                        Questionnaire Title: <b>{title}</b>
                                    </Typography>
                                </CardContent>
                            </Grid>

                            <Grid item xs={3}>
                                <CardActions className={classes.cardActions}>
                                    <Button
                                        onClick={() => { }}>
                                        Edit Questionnaire
                                    </Button>
                                    <Button
                                        onClick={() => { }}>
                                        Delete Questionnaire
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    )}
                </div>
                :
                <div>
                    <h1>You Have No Listed Questionnaires </h1>
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