import { TextField, DialogActions, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Filter } from "bad-words";
import { Formik, Field, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const filter = new Filter();

export const CreateCategoryDialog = observer(({ open, onClose, onCreate }: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('RequiredField'))
      .test('capitalized', t('MustStartWithCapital'), (value) => {
        return value ? value[0] === value[0].toUpperCase() : false;
      })
      .test('no-bad-words', t('NoInappropriateWords'), (value) => {
        return !filter.isProfane(value || '');
      })
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('AddNewCategory')}</DialogTitle>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await onCreate(values.name);
            resetForm();
            onClose();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                name="name"
                label={t('CategoryName')}
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{
                    '& input:focus-within, & textarea:focus-within': {
                      boxShadow: 'none',
                      background: 'none',
                    },
                  }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>{t('Cancel')}</Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {t('Add')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

 