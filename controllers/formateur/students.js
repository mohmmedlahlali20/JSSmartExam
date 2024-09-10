exports.getEtudiant = async (req, res) => {
    try {
        const { rows } = await db.query(`
            SELECT a.*, c.class_name 
            FROM Apprenants a
            JOIN classes c ON a.class_id = c.id
        `);
        res.render('dashboardFormateur/classes/classFormateur', { Apprenants: rows });
    } catch (err) {
        console.error('Error fetching Apprenants:', err);
        res.status(500).send('Server Error');
    }
}

  

// exports.postEtudiant = async (req, res) => {
//     try {
//         const { nom, prenom, date_de_naissance, email, specialite, class_id } = req.body;
//         await db.query('INSERT INTO Apprenants (nom, prenom, date_de_naissance, email, specialite, class_id) VALUES (?, ?, ?, ?, ?, ?)', [nom, prenom, date_de_naissance, email, specialite, class_id]);
//         res.redirect('/etudaints');
//     } catch (err) {
//         console.error('Error adding Apprenant:', err);
//         res.status(500).send('Server Error');
//     }
// }

// exports.deleteEtudiant = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await db.query('DELETE FROM Apprenants WHERE id = ?', [id]);
//         res.redirect('/etudaints');
//     } catch (err) {
//         console.error('Error deleting Apprenant:', err);
//         res.status(500).send('Server Error');
//     }
// }

// exports.getEditEtudiant = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [rows] = await db.query('SELECT * FROM Apprenants WHERE id = ?', [id]);
//         res.render('dashboardFormateur/classes/editEtudaint', { Apprenant: rows[0] });
//     } catch (err) {
//         console.error('Error fetching Apprenant:', err);
//         res.status(500).send('Server Error');
//     }
// }

// exports.postEditEtudiant = async (req, res) => {
//     try {
//         const { id, nom, prenom, date_de_naissance, email, specialite, class_id } = req.body;
//         await db.query('UPDATE Apprenants SET nom = ?, prenom = ?, date_de_naissance = ?, email = ?, specialite = ?, class_id = ? WHERE id = ?', [nom, pre
//             , date_de_naissance, email, specialite, class_id, id]);
//         res.redirect('/etudaints');
//         } catch (err) {
//         console.error('Error updating Apprenant:', err);
//         res.status(500).send('Server Error');
//     }
// }
